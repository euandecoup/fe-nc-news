function capitaliseFirstLetter (str) {
    if (str.length === 0) return ''
    const capitalisedStr = str.charAt(0).toUpperCase() + str.slice(1)
    return capitalisedStr
}

export default capitaliseFirstLetter
