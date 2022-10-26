const express = require('express');
const router = express.Router();
const members=require('../../Members')


//get all members 
router.get('/', function (req, res) { 
    res.json(members);
})
//get single member
router.get('/:id', (req, res) => { 
    var reqID = parseInt(req.params.id)
    const found=members.some(member => member.id === reqID)
    if (found) {
        res.json(members.filter(member => member.id === reqID));
    }else {
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
})
// create a new member
router.post('/', (req, res) => {
    const newMember = {
        id: members.length+1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        res.json({ msg: 'Include both name and email' });
    } else {
        members.push(newMember);
        res.json(members);
    }

});
 //update member
router.put('/:id', (req, res) => {
    if (members.some(member => member.id === parseInt(req.params.id))) {
        const updMember = req.body;
        members.forEach(member => {
            if (member => member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: 'Member updated', member });
            }
        });
    } else { 
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
});
//delete member
router.delete('/:id', (req, res) => { 
    if (members.some(member => member.id === parseInt(req.params.id))) {
        res.json(
            {
                msg: `member deleted`,
                members: members.filter(member => member.id !== parseInt(req.params.id))
            }
        );
    } else { 
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        });
    }

})
module.exports = router;