export const transformString = (input: string) => {
    // 1. 取得第一個字元 'A' 的 ASCII 碼 (65)
    const charCode = input.charCodeAt(0);

    // 2. 取得後面的數字部分 '001' 並轉為整數 (1)
    // substring(1) 代表從索引 1 開始截取到最後
    const numPart = parseInt(input.substring(1), 10);

    // 3. 執行運算：ASCII * 1000 + 數字
    return charCode * 1000 + numPart;
}
