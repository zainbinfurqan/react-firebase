import moment from 'moment'

const dateFormat = {}

dateFormat.fullDateWithTimeInWords = (date) => {
    return moment(date).format('dddd MMMM YYYY hh:mm:ss a')
}

dateFormat.fullDateWithOutTimeInWords = (date) => {
    console.log(date)
    return moment(date).format('dddd MMMM YYYY')
}

dateFormat.MonthDateYear = (date) => {
    return moment(date).format('MM DD YYYY')
}

dateFormat.DateMonthYear = (date) => {
    return moment(date).format('DD MM YYYY')
}

dateFormat.YearMonthDate = (date) => {
    return moment(date).format('YYYY MM DD')
}

export default dateFormat