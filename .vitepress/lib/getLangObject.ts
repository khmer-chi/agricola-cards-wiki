export const getLangObject = (langObject: Record<string, any>, langName: string, field: string, key: string) => {
    return langObject[langName][field]?.[key] ?? key;
};