data = [

    {

        id: 1,

        name: "Ibtisam"

    },

    {

        id: 2,

        name: "Fatima"

    },

    {

        id: 3,

        name: "Ayesha"

    }

]



function concat() {

    return (obj) => {

        obj.id_name = obj.id + " - " + obj.name;

        return obj;

    }

}



function addition(n1, n2) {

    return n1 + n2;

}



module.exports = {

    concat,

    addition

}
