const fs = require("fs");
const data = require("./data.json");
const { age, level, date } = require("./utils");

//index
exports.index = function(req, res){



    return res.render("teachers/index", { teachers: data.teachers });
}

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

    occupations = occupations.trim().split(/\s*,\s*/);


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

//put
exports.update = function(req, res){
    const { id } = req.body;

    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id){
            index = foundIndex;
            return true;
        }
    })

    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(id),
        occupations: req.body.occupations.trim().split(/\s*,\s*/)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!");

        return res.redirect("/teachers");
    })


}

//delete
exports.delete = function(req, res){
    const { id } = req.body;

    const teachersFiltered = data.teachers.filter(function(teacher){
        return id != teacher.id;
    })

    data.teachers = teachersFiltered;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error");

        return res.redirect("/teachers");
    })
}