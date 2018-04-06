import fs from 'fs'
import axios from 'axios'
import _ from 'lodash'
import distance from 'euclidean-distance'

const system_to_find = 'Lembava';
const max_distance = 80.0;

async function getit() {
    try {
        let data = fs.readFileSync('systems_populated.json');
        return JSON.parse(data);
    } catch (err) {
        console.log(`systems_populated.json unreadable`)
    }
    
    let data = await axios.request({
      url: 'https://eddb.io/archive/v5/systems_populated.json',
      method: 'get',
    })
    
    console.log(`Received systems_populated.json\nWriting...`)
    fs.writeFileSync('systems_populated.json', JSON.stringify(data.data));
    console.log(`Finished writing systems_populated.json`)
    
    return data.data;
}

let data_promise = getit();
data_promise.then(data => {
    
    let found_system = _.find(data, (v,k,c) => { return v.name == system_to_find; });
    let found_system_coordinate = [found_system.x, found_system.y, found_system.z];
    
    console.log(`Lembava: ${found_system}`)
    
    let systems = _.pickBy(data, (v,k) => { return v.name != system_to_find; });
    console.log(`Checking against ${Object.keys(systems).length} systems`);
    
    let found = [];
    for(let s in systems) {
        systems[s].distance = distance(found_system_coordinate, [systems[s].x, systems[s].y, systems[s].z]);
        if(systems[s].distance <= max_distance) {
            found.push(systems[s]);
            
            console.log(`Found ${systems[s].name} dist:${systems[s].distance} x:${systems[s].x} y:${systems[s].y} z:${systems[s].z}`)
        }
        
    }
    
    fs.writeFileSync('found_systems.json', JSON.stringify(found));
    console.log(`Done!`)
}, err => {
    console.error(err)
});

