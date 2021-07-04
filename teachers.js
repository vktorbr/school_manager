const fs = require("fs");
const data = require("./data.json");
const { age, level, date } = require("./utils");

//create
exports.post = function(req, res){
    const keys = Object.keys(req.body);
    for (const key of keys) {
        if(req.body[key] == ""){
            return res.send("Please, fill all fields!");
        }
    }

    let { avatar_url, name, birth, education_level, class_type, occupations } = req.body;


    const created_at = Date.now();
    const id = data.teachers.length + 1;
    birth = Date.parse(birth);

    data.teachers.push({
        id,
        created_at,
        avatar_url,
        name,
        birth,
        education_level,
        class_type,
        occupations
    });


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!");
    })

    return res.redirect("/teachers");
   
}

//show
exports.show = function(req, res){
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id;
    })

    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        occupations: foundTeacher.occupations.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundTeacher.created_at),
        education_level: level(foundTeacher.education_level)
    }

    return res.render("teachers/show", { teacher });
}

//edit
exports.edit = function(req, res){
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id;
    })

    if(!foundTeacher) return res.send("Teacher not Found!");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render("teachers/edit", { teacher });
}