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