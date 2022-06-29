function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
function createEmployeeRecords(arrOfArr) {
    let employeeRecords =[]
    
    for (let i = 0; i < arrOfArr.length; i++){
        employeeRecords.push(createEmployeeRecord(arrOfArr[i]))
    }
    return employeeRecords
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
    let obj = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    }
    employeeRecordObj.timeInEvents.push(obj)
    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    let obj = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    }
    employeeRecordObj.timeOutEvents.push(obj)
    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date) {
    let hours;
    let timeInEvents = employeeRecordObj.timeInEvents.find(obj => date === obj.date)
    let timeOutEvents = employeeRecordObj.timeOutEvents.find(obj => date === obj.date)
    hours = timeOutEvents.hour - timeInEvents.hour
    return hours/100
}

function wagesEarnedOnDate(employeeRecordObj,date) {
  return (hoursWorkedOnDate(employeeRecordObj, date)) * employeeRecordObj.payPerHour
}

function allWagesFor(employeeRecordObj) {
    let allPay = []
    let allDates = []

    for ( let i = 0; i < employeeRecordObj.timeInEvents.length; i++){
        allDates.push(employeeRecordObj.timeInEvents[i].date)
    }
    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(employeeRecordObj,date))
    })
    return allPay.reduce((previousValue, currentValue) => previousValue + currentValue)
}

function calculatePayroll(arrOfEmployeeRecordObj) {
    let payRoll = []
    arrOfEmployeeRecordObj.forEach(employee =>{
        payRoll.push(allWagesFor(employee))
    })
    return payRoll.reduce((previousValue, currentValue) => previousValue + currentValue)
}