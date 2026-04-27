function cleanName(name, keyword) {
    let cleanedName = name.trim().toLowerCase();
    let cleanedKeyword = keyword.toLowerCase();
    return cleanedName.includes(cleanedKeyword);
}
