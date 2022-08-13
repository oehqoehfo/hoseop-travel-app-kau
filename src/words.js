
//Some place name is written non latin letters. Change them to english
module.exports={
    returnWordsInEnglish:function returnWordsInEnglish(word){
        let returnWord;
        switch(word){
            case '남산공원':
                returnWord="Namsan Park";
                break;
            case 'Таганский парк (Екатеринбург)':
                returnWord="Tagansky Park, Yekaterinburg";
                break;
            case 'Музей музыкальных инструментов':
                returnWord="Museum of folk musical instruments";
                break;
            case '웨스턴 브리지':
                returnWord="Western Bridge";
                break;
            case '북촌한옥마을':
                returnWord="Bukchon Hanok Village";
                break;
            case '朝阳公园':
                returnWord="Chaoyang Park";
                break;
            case '北京鼓楼和钟楼':
                returnWord="Drum Tower and Bell Tower of Beijing";
                break;
            case '白帝城':
                returnWord="Baidicheng";
                break;
            case '퍼스트가든':
                returnWord="First Garden";
                break;
            case '鞑靼清真寺':
                returnWord="Tartar Mosque";
                break;
            case '여의도한강공원':
                returnWord="Yeouido Hangang Park";
                break;
            default:
                returnWord=word;
        }
        return returnWord;
    }
};