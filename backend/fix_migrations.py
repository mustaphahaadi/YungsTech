import os
import sqlite3
import sys

# Connect to the SQLite database
conn = sqlite3.connect('db.sqlite3')
cursor = conn.cursor()

# Delete all migration records to start fresh
try:
    cursor.execute("DELETE FROM django_migrations")
    conn.commit()
    print("Successfully deleted all migration records.")
except sqlite3.OperationalError:
    print("Table django_migrations doesn't exist yet, which is fine.")

# Close the connection
conn.close()

print("Migration records have been reset. Now you can run migrations again.")