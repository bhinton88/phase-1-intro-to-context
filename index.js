function createEmployeeRecord(employee) {
  return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
  }  
}

function createEmployeeRecords(array) {
  return array.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent (employee, event) {
   let [date, hour] = event.split(" ")
   const timeInObj = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
   }
   employee.timeInEvents.push(timeInObj)
   return employee
}

function createTimeOutEvent (employee, event) {
  let [date, hour] = event.split(" ")
  const timeInObj = {
     type: "TimeOut",
     hour: parseInt(hour, 10),
     date
  }
  employee.timeOutEvents.push(timeInObj)
  return employee
}

function hoursWorkedOnDate (employee, date) {
  const clockIn = employee.timeInEvents.find(event => event.date === date)
  const clockOut = employee.timeOutEvents.find(event => event.date === date)
  
  return (clockOut.hour-clockIn.hour) / 100

}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee,date) * employee.payPerHour
}

function allWagesFor (employee) {
// we want to pass an employee in, sum up the total hours worked by adding the hours
// worked each day 
return employee.timeInEvents.map(data => wagesEarnedOnDate(employee, data.date)).reduce((previousValue, initialValue) => initialValue + previousValue)
}

function calculatePayroll(employees) {
  return employees.map(employee => employee.timeInEvents.map(data => wagesEarnedOnDate(employee, data.date)).reduce((previousValue, initialValue) => initialValue + previousValue)).reduce((previous,current) => previous + current)
}