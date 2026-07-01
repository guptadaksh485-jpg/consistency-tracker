const express=require("express");
const router=express.Router();
const Group=require("../models/Group")

const crypto = require("crypto");
const verifyAuth = require("../middlewares/authMiddleware");
const Log = require("../models/Log");

router.post("/create",verifyAuth,async(req,res)=>{
    try{
           const userId = req.user.userId;
           const grpName=req.body.name?.trim();;
          
    if(!grpName){
       return res.status(400).json({message: "Group name required"});  
    }
    

let inviteCode;
let exists = true;

while (exists) {
    inviteCode = crypto.randomBytes(4).toString("hex").toUpperCase();
    exists = await Group.findOne({ inviteCode });
}
    const newGroup=new Group({
        name:grpName, members:[userId], inviteCode:inviteCode,createdBy:userId
    });
 await newGroup.save();
return res.status(201).json({
    message: "Group created successfully",
    group: newGroup
});

    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
});

router.post("/join",verifyAuth,async(req,res)=>{
try{
const userId = req.user.userId;
const inviteCode  = req.body.inviteCode;
 if(!inviteCode){
       return res.status(404).json({message: "Invite Code required"});  
    }
const group = await Group.findOne({
    inviteCode
});
 if(!group){
       return res.status(404).json({message: "Invalid Invite code"});  
    }
   let flag= group.members.some(
    member => member.toString() === userId
);
   if(!flag)
    {group.members.push(userId);
    await group.save();

    return res.status(200).json({
    message: "Group joined successfully",
    group
});
    }
else {
    return res.status(409).json({
    message:"Already a member"
});
}
}
 catch(err){
        return res.status(500).json({error:err.message});
    }
});

router.get("/", verifyAuth, async (req, res) => {
    try {
        const userId = req.user.userId;

        const groups = await Group.find({
            members: userId
        }).populate("createdBy", "userName");

        return res.json({
            groups
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});


router.get("/:id", verifyAuth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const groupId = req.params.id;
        const group = await Group.findById(groupId);
          if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }
        const isMember = group.members.some(
    member => member.toString() === userId
);

if (!isMember) {
    return res.status(403).json({
        message: "Access denied"
    });
}

await group.populate("members", "userName");
        if(group){
        return res.json({
            group
        });
    }
    else { 
        return res.status(404).json({
            message: "Group not found"
        });}

    } 
    
    catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

router.patch("/:id/invite",verifyAuth,async(req,res)=>{
   try {  const userId = req.user.userId;
     const groupId = req.params.id; 
     const group = await Group.findById(groupId);
      if(!group){
         return res.status(404).json({
            message: "Group not found"
        });}
    
     if (group.createdBy.toString() !== userId) {
    return res.status(403).json({
        message: "Only the group owner can regenerate the invite code"
    });
}   
 let inviteCode;
let exists = true;

while (exists) {
    inviteCode = crypto.randomBytes(4).toString("hex").toUpperCase();
    exists = await Group.findOne({ inviteCode });
}

group.inviteCode =inviteCode;
await group.save();

return res.status(200).json({
    message: "Invite code regenerated successfully",
    inviteCode: group.inviteCode
});
    
     }
    catch(err){
    return res.status(500).json({
        error: err.message
    });}
});

router.get("/:id/leaderboard",verifyAuth,async(req,res)=>{
    try{
        const userId = req.user.userId;
        const groupId = req.params.id;
        const { habitId } = req.query;

        const group = await Group.findById(groupId)
            .populate("members", "userName");

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const isMember = group.members.some(
            member => member._id.toString() === userId
        );

        if (!isMember) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const last7 = new Date();
        last7.setDate(last7.getDate() - 7);

        const memberIds = group.members.map(member => member._id);

        const query = {
            userId: { $in: memberIds },
            date: { $gte: last7 }
        };

        if (habitId) {
            query.habitId = habitId;
        }

        const logs = await Log.find(query);

        const counts = {};

        logs.forEach(log => {
            const id = log.userId.toString();

            counts[id] = (counts[id] || 0) + 1;
        });

        const leaderboard = group.members.map(member => ({
            userName: member.userName,
            weeklyLogs: counts[member._id.toString()] || 0
        }));

        leaderboard.sort((a, b) => b.weeklyLogs - a.weeklyLogs);

        leaderboard.forEach((user, index) => {
            user.rank = index + 1;
        });

        return res.status(200).json({

    type: habitId ? "habit" : "overall",
      leaderboard,
    habitId: habitId || null
  
        });

    }
    catch(err){
    return res.status(500).json({
        error: err.message
    });}
});

router.get("/:id/feed", verifyAuth, async (req, res) => {
    try {

        const userId = req.user.userId;
        const groupId = req.params.id;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const isMember = group.members.some(
            member => member.toString() === userId
        );

        if (!isMember) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const logs = await Log.find({
            userId: { $in: group.members }
        })
            .sort({ date: -1 })
            .limit(20)
            .populate("userId", "userName")
            .populate("habitId", "title");

        return res.status(200).json({
            feed: logs
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

router.delete("/:id/leave", verifyAuth, async (req, res) => {
    try {

        const userId = req.user.userId;
        const groupId = req.params.id;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        if (group.createdBy.toString() === userId) {
            return res.status(403).json({
                message: "Group owner cannot leave the group"
            });
        }

        const isMember = group.members.some(
            member => member.toString() === userId
        );

        if (!isMember) {
            return res.status(400).json({
                message: "You are not a member of this group"
            });
        }

        group.members = group.members.filter(
            member => member.toString() !== userId
        );

        await group.save();

        return res.status(200).json({
            message: "Left group successfully"
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

router.delete("/:id", verifyAuth, async (req, res) => {
    try {

        const userId = req.user.userId;
        const groupId = req.params.id;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        if (group.createdBy.toString() !== userId) {
            return res.status(403).json({
                message: "Only the group owner can delete the group"
            });
        }

        await Group.findByIdAndDelete(groupId);

        return res.status(200).json({
            message: "Group deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});