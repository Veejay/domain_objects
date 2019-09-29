const capitalize = s => {
    const [firstLetter] = s
    return `${firstLetter.toUpperCase()}${s.slice(1)}`
}

module.exports = capitalize