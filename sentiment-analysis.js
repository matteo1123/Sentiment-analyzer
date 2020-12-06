let analyze = require('Sentimental').analyze
const fs = require('fs');

let data = fs.readFileSync('./conversations.txt', 'UTF-8')
const lines = data.split(/r?\n/)
let skipping = true
let string_accumulator = ""
let line_arr = []

for(let i = 0; i < lines.length; i++) {
     
    if(lines[i].includes('Semroska')) {
            skipping = true
            if(string_accumulator.length > 3 && analyze(string_accumulator).positive.score > 5 && !analyze(string_accumulator).negative ) {
                console.log(analyze(string_accumulator), string_accumulator)
                line_arr.push(string_accumulator)                
            }

            string_accumulator = ""

    } 
    else if(lines[i].match(/\d+:\d+/) && skipping) {
        skipping = false
    }

    if(!skipping) {
        if(!lines[i].match(/\d+:\d+/) && lines[i].length > 1) {
            string_accumulator += " " + lines[i]
        }
    }
}


    
