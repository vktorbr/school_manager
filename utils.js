exports.age = function(timestamp){
    const today = new Date();
    const birth = new Date(timestamp);

    //2021 - 1996 = 25
    let age = today.getFullYear() - birth.getFullYear();
    
    //07 - 12 = -
    const month = today.getMonth() - birth.getMonth();

    //15 - 16 = -
    const day = today.getDate() - birth.getDate();


    if(month < 0 || month == 0 && day < 0){
        age--;
    }

    return age;
}

exports.level = function(level){
    const levels = ["Ensino Médio Completo", "Ensino Superior Completo", "Mestrado", "Doutorado"];

    return levels[level - 1];
}

exports.date = function(timestamp){
    const birth = new Date(timestamp);

    const year = birth.getUTCFullYear();
    
    const month = `0${birth.getUTCMonth() + 1}`.slice(-2);

    const day = `0${birth.getUTCDate()}`.slice(-2);

    return {
        day, 
        month,
        year,
        birthDay: `${day}/${month}`, 
        iso: `${year}-${month}-${day}`
    };
}

exports.year = function(school_year){
    const middles = ["5° ano do ensino fundamental", "6° ano do ensino fundamental", "7° ano do ensino fundamental", "8° ano do ensino fundamental", "9° ano do ensino fundamental"];

    const highs = ["1° ano do ensino médio", "2° ano do ensino médio", "3° ano do ensino médio"];

    const number = Number(school_year.charAt(0));
    const select = school_year.charAt(1);

    return (select == "m" ? middles[number - 5] : highs[number - 1]);
}