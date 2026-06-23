# Notification System Design
# Stage 1

Developed Express.js backend with a modular architecture.
Created REST endpoints for Vehicles, Depots, and Notifications.
Integrated the provided evaluation APIs using authenticated HTTP requests.
Implemented logging across controllers and services using the provided Log() middleware.
Added centralized error handling and request processing for maintainable backend code.

# Stage 2

Database Choice

PostgreSQL (SQL)

Reason:
PostgreSQL is suitable because the data is structured and relational. It provides good performance for filtering, sorting, and joining data such as vehicles, depots, and notifications.

Suggested Schema

Vehicle

vehicle_id | task_id | impact_score | service_duration | depot_id

Depot

depot_id | mechanic_hours

Notification

notification_id | student_id | vehicle_id | type | message | timestamp

SQL Queries

-- Get all vehicles
SELECT * FROM Vehicle;
-- Get all depots
SELECT * FROM Depot;
-- Get notifications for a student
SELECT * FROM Notification
WHERE student_id = ?;
-- Get high-priority maintenance tasks
SELECT * FROM Vehicle
ORDER BY impact_score DESC;


Scalability

If the number of students grows from 50K to 500K:

Add indexes on student_id and vehicle_id.
Use pagination for notifications.
Cache frequently accessed data.
Use load balancing and database read replicas.

# Stage 3

SELECT *
FROM notifications
WHERE student_id = 1042
  AND is_read = false
ORDER BY created_at DESC;

Yes. It correctly fetches unread notifications for a student in descending order of creation time.

WHY IT IS SLOW ?

When notifications grow from 50K to 500K+, PostgreSQL may perform a full table scan and then sort the results if suitable indexes are not available. This increases query execution time.

Time Complexity :

Search: O(n)
Sorting: O(k log k) (where k is the number of matching rows )

What would you change?

Create a composite index on the columns used in filtering and sorting.

CREATE INDEX idx_notifications_student_read_created
ON notifications (student_id, is_read, created_at DESC);

This helps PostgreSQL quickly locate matching rows and return them in the required order.

Is adding indexes always safe?

No.

Indexes improve SELECT performance but:

Increase storage usage.
Slow down INSERT, UPDATE, and DELETE operations because indexes must also be updated.

Indexes should be added only for frequently queried columns.

Query: Students who received Placement notifications in the last 7 days
SELECT DISTINCT student_id
FROM notifications
WHERE notification_type = 'Placement'
  AND created_at >= NOW() - INTERVAL '7 days';

This returns all unique students who received Placement notifications during the last seven days.

# Stage 4

Reducing Database Load

Fetching notifications on every page load increases database load and slows the user experience.

Suggested Solutions

1. Pagination (Recommended)

Fetch only 10–20 notifications at a time.
Trade-off: Faster loading, but users need to load more pages for older notifications.

2. Caching (Redis)

Store recently accessed notifications in cache.
Trade-off: Much faster reads, but cache must be updated when notifications change.

# Stage 5

Problems with the Current Approach

The current algorithm sends notifications one student at a time. This creates several issues:

* Sequential processing is slow. Sending notifications to 50,000 students one by one takes a long time.
* If one operation fails, the remaining students may not receive notifications.
* Email sending and database storage depend on each other. If the email service fails, the notification may not be saved.
* There is no retry mechanism for failed notifications.
* The request remains blocked until all notifications are processed.

Improved Approach

1. Store all notifications in the database using a bulk insert.
2. Add each notification to a message queue.
3. Return the response immediately without waiting for notification delivery.
4. Background workers process the queue by:

   * Sending email notifications.
   * Sending in-app notifications.
   * Retrying failed jobs up to three times.
5. Store permanently failed jobs in a `failed_notifications` table for later processing.

Benefits

* Bulk insert reduces the number of database queries.
* Queue-based processing allows multiple workers to send notifications in parallel.
* Database storage is independent of email delivery.
* Failed notifications are automatically retried.
* Faster API response because the request is non-blocking.
* Easy to scale by increasing the number of background workers during peak periods.

Database and Email

Notifications should always be saved to the database before sending emails. Email delivery depends on external services and may fail due to network issues or API limits. Saving the notification first ensures that students can still view it in the application even if the email is not delivered.
