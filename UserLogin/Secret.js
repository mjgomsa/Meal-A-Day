const { map } = require('jquery');

const secret_data = require('data-store')({path: process.cwd() + '/data/secrets.json'});

class Secret {
    constructor(id, owner, secret) {
        this.id = id;
        this.owner = owner;
        this.secret = secret;
    }

    update(secret) {
        //once a secret has an owner or id, it can't be updated
        this.secret = secret;
        secret_data.set(this.id.toString(), this);

    }

    delete(){
        secret_data.del(this.id.toString());
    }
}

Secret.getAllIDs = () => {
    return Object.keys(secret_data.data).map(id => parseInt(id));
};

Secret.getAllIDsForOwner = (owner) => {
    //returns all the secrets that belong to the owner. 
    return Object.keys(secret_data.data).filter(id => secret_data.get(id).owner == owner).map(id => parseInt(id));
}

Secret.findByID = (id) => {
    let sdata = secret_data.get(id);
    if(sdata != null) {
        return new Secret(sdata.id, sdata.owner, sdata.secret);
    }
    return null;
};

Secret.next_id = Secret.getAllIDs().reduce((max, next_id ) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

//factory method
Secret.create = (owner, secret) => {
    let id = Secret.next_id;
    Secret.next_id += 1;
    let s = new Secret(id, owner, secret);
    secret_data.set(s.id.toString(), s);
    return s;
}

module.exports = Secret;

// class Secret {

//     constructor (id, owner, secret) {
//         this.id = id;
//         this.owner = owner;
//         this.secret = secret;
//     }

//     update (secret) {
//         this.secret = secret;
//         secret_data.set(this.id.toString(), this);
//     }

//     delete () {
//         secret_data.del(this.id.toString());
//     }
// }


// Secret.getAllIDs = () => {
//     return Object.keys(secret_data.data).map(id => parseInt(id));
// };

// Secret.getAllIDsForOwner = (owner) => {
//     return Object.keys(secret_data.data).filter(id => secret_data.get(id).owner == owner).map(id => parseInt(id));
// }


// //assumed to be a string
// Secret.findByID = (id) => {
//     let sdata = secret_data.get(id);
//     if (sdata != null) {
//         return new Secret(sdata.id, sdata.owner, sdata.secret);
//     }
//     return null;
// };


// //scans thru all the ids so you know the next one to create
// Secret.next_id = Secret.getAllIDs().reduce((max, next_id) => {
//     if (max < next_id) {
//         return next_id;
//     }
//     return max;
// }, -1) + 1;

// Secret.create = (owner, secret) => {
//     let id = Secret.next_id;
//     Secret.next_id += 1;
//     let s = new Secret(id, owner, secret);

//     //store it back
//     secret_data.set(s.id.toString(), s);
//     return s;
// }

// module.exports = Secret;