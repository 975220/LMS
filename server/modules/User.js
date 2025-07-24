import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: {type: String,requried: true},
        name: {type: String,requried: true},
        email: {type: String,requried: true},
        imageUrl: {type: String,requried: true},
        enrolledCourse: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]

    }, {timestamps: true}); 

    const User = mongoose.model('User', userSchema);

    export default User