import datetime

class Person:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.attendance_records = []

    def mark_attendance(self, in_time, out_time):
        self.attendance_records.append({
            'in_time': in_time,
            'out_time': out_time
        })

people = [
    Person(1, "Omkar"),
    Person(2, "Sam"),
    Person(3, "Rohit")
]

for person in people:
    in_time = datetime.datetime.now()
    out_time = in_time + datetime.timedelta(hours=8)  
    person.mark_attendance(in_time, out_time)

for person in people:
    total_hours = sum((record['out_time'] - record['in_time']).total_seconds() / 3600 for record in person.attendance_records)
    print(f"{person.name}: {total_hours:.2f} hours")