const className = (styles) => {
    const getcn = (str) => {
        if (!str) return []
        const arr = str.trim().split(/\s+/)
        return arr.map(s => styles[s]).filter(s => !!s)
    }
    return (str, ...cn) => {
        const arr = []
        for (let i = 0; i < str.length; i++) {
            arr.push(...getcn(str[i]))
            arr.push(...getcn(cn[i]))
        }
        return arr.filter(s => !!s).join(' ')
    }
}

export default className