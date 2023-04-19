function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayOfEmployees) {
  const recordsOfEmployees = arrayOfEmployees.map(createEmployeeRecord);
  return recordsOfEmployees;
}

function createTimeInEvent(employeeRecord, timeIn) {
  const [date, hour] = timeIn.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour),
  });

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOut) {
  const [date, hour] = timeOut.split(` `);

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour),
  });

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  let hoursWorked = 0;
  for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
    if (employeeRecord.timeInEvents[i].date === date) {
      hoursWorked +=
        (employeeRecord.timeOutEvents[i].hour -
          employeeRecord.timeInEvents[i].hour) /
        100;
    }
  }

  return hoursWorked;
}

const wagesEarnedOnDate = (employeeRecord, date) =>
  hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;

const allWagesFor = (employeeRecord) =>
  employeeRecord.timeInEvents.reduce((accumulator, currentTimeInEvent) => {
    return (
      accumulator + wagesEarnedOnDate(employeeRecord, currentTimeInEvent.date)
    );
  }, 0);

const calculatePayroll = (employeeRecords) => {
  return employeeRecords.reduce((payroll, employeeRecord) => {
    return payroll + allWagesFor(employeeRecord);
  }, 0);
};
