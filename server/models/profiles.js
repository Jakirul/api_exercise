const profileData = require('../data');


class Profile {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.email = data.email;
    }

    // static get all() {
    //     const profiles = profileData.map((profile) => new Profile(profile))
    //     return profiles
    // }

    static get names(){
        const profiles = profileData.map((profile)=> profile.name)
        return profiles;
    }

    static findByName(name) {
        const profilesData = profileData.filter((profile) => profile.name === name)[0];

        if (!profilesData) {
            return;
        }
        const profile = new Profile(profilesData);
        return profile;
    }

    static create(profile) {
        const newProfileId = profileData.length + 1;
        const newProfile = new Profile({ id: newProfileId, ...profile });
        profileData.push(newProfile);
        return newProfile;
    }
}

module.exports = Profile