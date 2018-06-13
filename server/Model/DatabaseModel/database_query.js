var Sequelize = require('sequelize')
const Op = Sequelize.Op;
var model_required = require('./switchRequireModel') // lựa chọn bảng trong database phù hợp với kiểu người dùng;

var database_query = {
    getUser: async function (username) {
        try {
            let acc = new model_required('account');
            let student = model_required('student');
            let partner = model_required('partner');
            let lecturer = model_required('lecturer');
            let admin = model_required('admin');
            acc.hasOne(partner, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(student, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(lecturer, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(admin, { targetKey: 'userID', foreignKey: 'account_userID' });

            let user = await acc.findOne({
                include: [
                    {
                        model: student,
                        attributes: ['name']
                    },
                    {
                        model: lecturer,
                        attributes: ['name']
                    },
                    {
                        model: partner,
                        attributes: ['name']
                    },
                    {
                        model: admin,
                        attributes: ['name']
                    }
                ],
                where: { username: username },
                raw: true
            })
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error)
        }

    },
    getUserByID: async function (userID) {
        try {
            let acc = new model_required('account');
            let user = await acc.findOne({
                where: { userID: userID },
                raw: true
            })
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getUserByType: async function (type) {
        try {
            let acc = new model_required('account');
            let arr = await acc.findAll({
                where: { type: type },
                raw: true
            })
            let result={};
            let totalAtServer = await acc.findAll({attributes:['account_userID'],raw:true});
            result.total = totalAtServer.length;
            result.arr = arr;
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(new Error("không tìm thấy kết quả phù hợp"))
        }
    },
    getUserInfor: async function (userID, type) {
        let userTable = new model_required(type);// chọn bảng thông tin theo kiểu người dùng
        try {
            let userInfor = await userTable.findOne({
                where: { account_userID: userID },
                raw: true
            })
            userInfor.type = type;
            return Promise.resolve(userInfor);
        } catch (error) {
            return Promise.reject(new Error("khong tim duoc du lieu nguoi dung này"));
        }
    },
    getListJobStudentFollow: async function (studentID, statusOption) {
        try {
            if (statusOption != "all" && statusOption != "waiting" && statusOption != "accepted" && statusOption != "working") return Promise.reject(new Error("statusOption không hợp lệ"))
            let student_follow_job = new model_required("student_follow_job");
            let internship_job = new model_required("internship_job");
            let partner_info = model_required("partner_info");
            student_follow_job.belongsTo(partner_info,{foreignKey:'otherPartnerID',targetKey:'partner_infoID'})
            let partner = model_required("partner");
            student_follow_job.belongsTo(internship_job, { foreignKey: 'jobID', targetKey: 'jobID' });
            internship_job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr;
            if (statusOption == "all") {
                arr = await student_follow_job.findAll({
                    include: [
                        {
                            model: internship_job,
                            include: {
                                model: partner,
                                require: true,
                                attributes: ['name', 'logo']
                            }
                        },
                        {model:partner_info}

                    ],
                    where: {
                        studentID: studentID,
                    },
                    raw: true
                })
            } else {
                arr = await student_follow_job.findAll({
                    include: [
                        {
                            model: internship_job,
                            require: true,
                            include: {
                                model: partner,
                                require: true,
                                attributes: ['name', 'logo']
                            }
                        },
                        {model:partner_info}

                    ],
                    where: {
                        studentID: studentID,
                        status: statusOption,
                    },
                    raw: true
                })
            }
            return Promise.resolve(arr);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getListJobs: async function (start, total) {
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr = await job.findAll({
                include: [
                    {
                        model: partner,
                        required: true,
                        attributes: ['name', 'logo'],
                    }
                ],
                order: [['jobID', 'DESC']],
                offset: start - 1,
                limit: total,
                raw: true
            });
            let result={};
            let totalAtServer = await job.findAll({attributes:['jobID'],raw:true});
            result.total = totalAtServer.length;
            result.arr = arr;
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }

    },
    getListJobsByKeySearch: async function (key, typeofKey, start, total) {
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr;// luu ket qua tra ve;
            switch (typeofKey) {
                case "content": {
                    arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],

                            }
                        ],
                        where: { content: { [Op.like]: key } },
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                case "partnerName": {
                    arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],
                                where: {
                                    name: {
                                        [Op.like]: key
                                    }
                                }
                            }
                        ],
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                case "title": {
                    arr = await job.findAll({
                        include: [
                            {
                                model: partner,
                                required: true,
                                attributes: ['name', 'logo'],
                            }
                        ],
                        where: {
                            title: { [Op.like]: key }
                        },
                        offset: start - 1,
                        limit: total,
                        raw: true
                    });
                    break;
                }
                default: return Promise.reject(new Error("khong xac dinh kieu tim kiem"))
            }

            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListUsers: async function (start, total, userType) {
        try {
            let user = new model_required(userType);
            let arr = await user.findAll({
                offset: start - 1,
                limit: total,
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }

    },
    getListUsersForAdmin: async function (start, total, userType) {
        try {
            let user = new model_required(userType);
            let acc = model_required('account');
            user.belongsTo(acc, { foreignKey: 'account_userID', targetKey: 'userID' });
            let arr = await user.findAll({
                include: [{ model: acc, attributes: ['username'] }],
                offset: start - 1,
                limit: total,
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }

    },
    getListUserStudentFollow: async function (studentID) {
        try {
            let student_follow_partner = new model_required("student_follow_partner");
            let student_follow_lecturer = model_required("student_follow_lecturer");
            let arrPartner = await student_follow_partner.findAll({
                where: { studentID: studentID },
                attributes: [['partnerID', 'userID']],
                raw: true
            })
            let arrLecturer = await student_follow_lecturer.findAll({
                where: { studentID: studentID },
                attributes: [['lecturerID', 'userID']],
                raw: true
            })
            arrLecturer.forEach(element => {
                arrPartner.push(element);
            });
            return Promise.resolve(arrPartner);
        } catch (error) {
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getLecturerStudentFollow: async function (studentID) {
        try {
            let student_follow_lecturer = model_required("student_follow_lecturer");
            let lecturer = model_required("lecturer");
            student_follow_lecturer.belongsTo(lecturer, { foreignKey: 'lecturerID', targetKey: 'account_userID' })
            let arrLecturer = await student_follow_lecturer.findAll({
                include: [{
                    model: lecturer,
                }],
                where: { studentID: studentID },
                raw: true
            })
            return Promise.resolve(arrLecturer);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getListPartnersStudentFollow: async function (studentID) {
        try {
            let student_follow_partner = model_required("student_follow_partner");
            let partner = model_required("partner");
            student_follow_partner.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' })
            let arrPartner = await student_follow_partner.findAll({
                include: [{
                    model: partner,
                }],
                where: { studentID: studentID },
                raw: true
            })
            return Promise.resolve(arrPartner);
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error("try vấn thất bại"));
        }
    },
    getMessages: async function (userID, start, total) {
        try {
            let mes = new model_required('message');
            let acc = new model_required('account');
            let student = model_required('student');
            let partner = model_required('partner');
            let lecturer = model_required('lecturer');
            let admin = model_required('admin');
            acc.hasOne(partner, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(student, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(lecturer, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(admin, { targetKey: 'userID', foreignKey: 'account_userID' });
            mes.belongsTo(acc, { foreignKey: 'senderID', targetKey: 'userID' });

            let arr = await mes.findAll({
                include: [
                    {
                        model: acc,
                        required: true,
                        include: [
                            {
                                model: student,
                                attributes: ['name']
                            },
                            {
                                model: lecturer,
                                attributes: ['name']
                            },
                            {
                                model: partner,
                                attributes: ['name']
                            },
                            {
                                model: admin,
                                attributes: ['name']
                            }
                        ],
                        attributes: [],
                    }
                ],
                where: {
                    receiverID: userID
                },
                order: [['createdAt', 'DESC']],
                offset: start - 1,
                limit: total,
                raw: true
            })
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getUserSentMessage: async function (userID) {  // trả về ID của những người dùng đã gửi tin nhắn cho người dùng có id là userID 
        try {
            let message = model_required('message');
            let result = await message.findAll({
                where: {receiverID:userID},
                attributes: ['senderID'],
                group: ['senderID'],
                raw: true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);

        }
    },
    getUserReceivedMessage: async function (userID) {  // trả về ID của những người dùng đã nhận tin nhắn từ người dùng có id là userID 
        try {
            let message = model_required('message');
            let result = await message.findAll({
                where: {senderID:userID},
                attributes: ['receiverID'],
                group: ['receiverID'],
                raw: true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);

        }
    },

    getMessagesByGroup: async function (userID1, userID2) {
        try {
            let mes = new model_required('message');
            let acc = new model_required('account');
            let student = model_required('student');
            let partner = model_required('partner');
            let lecturer = model_required('lecturer');
            let admin = model_required('admin');
            acc.hasOne(partner, {  targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(student, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(lecturer, { targetKey: 'userID', foreignKey: 'account_userID' });
            acc.hasOne(admin, { targetKey: 'userID', foreignKey: 'account_userID' });
            mes.belongsTo(acc, { as:'sender', foreignKey: 'senderID', targetKey: 'userID' });
            mes.belongsTo(acc, {as: 'receiver', foreignKey: 'receiverID', targetKey: 'userID' });
            

            let arr = await mes.findAll({
                include: [
                    {
                        model: acc,
                        as:'sender',
                        required: true,
                        include: [
                            {
                                model: student,
                                attributes: ['name']
                            },
                            {
                                model: lecturer,
                                attributes: ['name']
                            },
                            {
                                model: partner,
                                attributes: ['name']
                            },
                            {
                                model: admin,
                                attributes: ['name']
                            }
                        ],
                        attributes: [],
                    },{
                        model: acc,
                        as:'receiver',
                        required: true,
                        include: [
                            {
                                model: student,
                                attributes: ['name']
                            },
                            {
                                model: lecturer,
                                attributes: ['name']
                            },
                            {
                                model: partner,
                                attributes: ['name']
                            },
                            {
                                model: admin,
                                attributes: ['name']
                            }
                        ],
                        attributes: [],
                    }
                ],
                where: {
                    [Op.or]: [
                        {
                            senderID: userID1,
                            receiverID: userID2
                        },
                        {
                            senderID: userID2,
                            receiverID: userID1
                        },
                    ]
                },
                order: [['createdAt', 'ASC']],
                raw: true
            })
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getMessagesByID: async function (messageID) {
        try {
            let mes = new model_required('message');
            let message = await mes.findAll({
                where: {
                    messageID: messageID
                },
                raw: true
            })
            return Promise.resolve(message[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getTerms: async function () {
        try {
            let term = new model_required("term");
            let arr = await term.findAll({
                raw: true
            }
            )
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getStudentFollowLecturer: async function (lecturerID) {
        try {
            let table = new model_required("student_follow_lecturer");
            let acc = new model_required("account");
            let student = new model_required("student");
            table.belongsTo(acc, { foreignKey: 'studentID', targetKey: 'userID' });
            acc.belongsTo(student, { foreignKey: 'userID', targetKey: 'account_userID' });
            let arr = await table.findAll({
                include: [
                    {
                        model: acc,
                        // required: true,
                        include: [
                            {
                                model: student,
                                // required:true,
                            }
                        ]
                    }
                ],
                where: {
                    lecturerID: lecturerID,
                    status: 'waiting'
                },
                raw: true
            }
            )
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getJobByID: async function (jobID) {
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            let term = model_required('term');
            job.belongsTo(term, { foreignKey: 'termID', targetKey: 'termID' })
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr = await job.findOne({
                include: [
                    {
                        model: partner,
                        required: true,
                        attributes: ['name', 'logo'],
                    },
                    { model: term }
                ],
                where: [{ jobID: jobID }],
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);

        }
    },
    getStudentAcceptedByLecturer: async function (lecturerID) {
        try {
            let table = new model_required("student_follow_lecturer");
            let acc = new model_required("account");
            let student = new model_required("student");
            table.belongsTo(acc, { foreignKey: 'studentID', targetKey: 'userID' });
            acc.belongsTo(student, { foreignKey: 'userID', targetKey: 'account_userID' });
            let arr = await table.findAll({
                include: [
                    {
                        model: acc,
                        // required: true,
                        include: [
                            {
                                model: student,
                                // required:true,
                            }
                        ]
                    }
                ],
                where: {
                    lecturerID: lecturerID,
                    status: 'accepted'
                },
                raw: true
            }
            )
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPlanReport: async function (studentID) {
        try {
            let plan_report = new model_required("plan_report");
            let comments = model_required("comments");
            let file = model_required("file");
            let job = model_required("internship_job");
            let lecturer_student = model_required("lecturer_student");
            plan_report.belongsTo(lecturer_student, { foreignKey: 'planReportID', targetKey: 'planReportID' });
            plan_report.belongsTo(file, { foreignKey: 'fileID', targetKey: 'fileID' });
            plan_report.belongsTo(job, { foreignKey: 'jobID', targetKey: 'jobID' });

            let result = await plan_report.findAll({
                include: [
                    { model: file },
                    { model: job },
                    { model: lecturer_student }
                ],
                where: {
                    studentID: studentID,
                },
                raw: true
            });
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListComment: async function (planReportID) {
        try {
            let comment = model_required("comments");
            let account = model_required("account");
            let student = model_required('student');
            let lecturer = model_required('lecturer');
            comment.belongsTo(account, { targetKey: 'userID', foreignKey: 'commenterID' });
            account.hasOne(student, { targetKey: 'userID', foreignKey: 'account_userID' });
            account.hasOne(lecturer, { targetKey: 'userID', foreignKey: 'account_userID' });
            let result = comment.findAll({
                include: [
                    {
                        model: account,
                        include: [
                            { model: student, attributes: ['name'] },
                            { model: lecturer, attributes: ['name'] }
                        ],
                        attributes: ['userID']
                    }],
                where: { planReportID: planReportID },
                raw: true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPlanReportByID: async function (planReportID) {
        try {
            let planReport = model_required("plan_report");
            let file = model_required("file");
            planReport.belongsTo(file, { foreignKey: 'fileID', targetKey: 'fileID' });
            let result = planReport.findAll({
                include: [{ model: file }],
                where: { planReportID: planReportID },
                raw: true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListStudentFollowJobOfPartner: async function (partnerID) {
        try {
            let job = model_required("internship_job");
            let student = model_required("student");
            let student_follow_job = model_required("student_follow_job");
            student_follow_job.belongsTo(job, { foreignKey: 'jobID', targetKey: 'jobID' });
            student_follow_job.belongsTo(student, { foreignKey: 'studentID', targetKey: 'account_userID' });
            let result = student_follow_job.findAll({
                include: [
                    {
                        model: job,
                        where: { partnerID: partnerID }
                    },
                    { model: student }],
                where: { status: 'waiting' },
                raw: true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListJobByPartner: async function (partnerID) {
        try {
            let job = model_required("internship_job");
            let partner = model_required("partner");
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let result = job.findAll({
                include: [{ model: partner, attributes: ['logo'] }],
                where: { partnerID: partnerID },
                raw: true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListStudentWorkingForPartner: async function (partnerID) {
        try {
            let student = model_required("student");
            let student_follow_job = model_required("student_follow_job");
            student_follow_job.belongsTo(student, { foreignKey: 'studentID', targetKey: 'account_userID' });
            let job = model_required("internship_job");
            student_follow_job.belongsTo(job, { foreignKey: "jobID", targetKey: 'jobID' });
            let result = await student_follow_job.findAll({
                include: [
                    {
                        model: student,
                        require: true
                    },
                    {
                        model: job,
                        where: {
                            partnerID: partnerID
                        },
                        require: true
                    }
                ],
                where: { status: 'working' },
                attributes: [],
                raw: true
            })
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getStudentAssession: async function (studentID) {
        try {
            let student_assession = model_required("student_assession");
            let lecturer = model_required("lecturer");
            let partner = model_required("partner");

            student_assession.belongsTo(lecturer, { targetKey: "account_userID", foreignKey: "assessorID" });
            student_assession.belongsTo(partner, { targetKey: "account_userID", foreignKey: "assessorID" });

            let result = student_assession.findAll({
                include: [{ model: lecturer }, { model: partner }],
                where: { studentID: studentID },
                raw: true
            })
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getCommentByID: async function (commentID) {
        try {
            let comments = model_required('comments')
            let result = comments.findOne({
                where: { commentID: commentID },
                raw: true
            })
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getAssessionByID: async function (assessorID, studentID) {
        try {
            let student_assession = model_required('student_assession')
            let result = student_assession.findOne({
                where: {
                    assessorID: assessorID,
                    studentID: studentID
                },
                raw: true
            })
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getListStudentFollowPartner: async function (partnerID) {
        try {
            let student_follow_partner = model_required("student_follow_partner");
            let result = student_follow_partner.findAll({
                where: { partnerID: partnerID },
                raw: true
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getLecturer_Student: async function (planReportID) {
        try {
            let lecturer_student = model_required("lecturer_student");
            let result = lecturer_student.findOne({
                where: { planReportID: planReportID },
                raw: true
            })
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getMarkTable: async function (lecturerID) {
        try {
            let lecturer_student = model_required("lecturer_student");
            let student_follow_lecturer = model_required("student_follow_lecturer");
            let student = model_required("student");
            let plan_report = model_required("plan_report");
            student.hasMany(plan_report, { foreignKey: 'studentID', sourceKey: 'account_userID' });
            plan_report.hasOne(lecturer_student, { foreignKey: 'planReportID', sourceKey: 'planReportID' });
            student_follow_lecturer.belongsTo(student, { foreignKey: 'studentID', targetKey: 'account_userID' });
            let result = student_follow_lecturer.findAll(
                {
                    where: { lecturerID: lecturerID, status: 'accepted' },
                    include: [{
                        model: student,
                        require: true,
                        include: [{
                            model: plan_report,
                            include: [
                                {
                                    model: lecturer_student,
                                    attributes: ['mark', 'comment']
                                }
                            ],
                            where: { isFinal: 1 },
                            attributes: []
                        }]
                    }],
                    raw: true
                },

            )
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPartnerInfo: async function (){
        try {
            let partner_info = model_required("partner_info");
            let student = model_required("student");
            partner_info.belongsTo(student,{foreignKey:'requesterID', targetKey:'account_userID'});
            let result = await partner_info.findAll({
                where:{status:'waiting'},
                include:[{model:student, attributes:['name']}],
                raw:true
            })
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getStudentWithLecturer: async function (start,total){
        try {
            let student = model_required("student");
            let student_follow_lecturer = model_required("student_follow_lecturer");
            student.hasMany(student_follow_lecturer,{as:'follow' ,sourceKey:'account_userID', foreignKey:'studentID'});
            let lecturer = model_required("lecturer");
            student_follow_lecturer.belongsTo(lecturer,{foreignKey:'lecturerID',targetKey:'account_userID'});
            let arr = await student.findAll({
                include:[{
                    model:student_follow_lecturer,
                    as:'follow',
                    include:[{model:lecturer,attributes:['name','account_userID','department']}],
                    attributes:[],
                }],
                attributes:['name','studentCode','email','vnumail','account_userID'],
                offset:start-1,
                limit:total,
                raw:true
            });
            let totalAtServer = await student.findAll({attributes:['account_userID'],raw:true});
            // result.total = totalAtServer.length;
            var result={};
            result.total = totalAtServer.length;
            result.arr = arr;
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)            
        }
    },
    getListJobByTerm:async function(termID){
        try {
            let job = new model_required('internship_job');
            let partner = new model_required('partner');
            let term = model_required('term');
            job.belongsTo(term, { foreignKey: 'termID', targetKey: 'termID' })
            job.belongsTo(partner, { foreignKey: 'partnerID', targetKey: 'account_userID' });
            let arr = await job.findAll({
                include: [
                    {
                        model: partner,
                        required: true,
                        attributes: ['name', 'logo'],
                    },
                    { model: term }
                ],
                where: { termID:termID },
                raw: true
            });
            return Promise.resolve(arr);
        } catch (error) {
            return Promise.reject(error);

        }
    }
};
module.exports = database_query;
// database_query.getUser("16021031").then(res => console.log(res)).catch( e => console.log(e));
// database_query.getUserInfor(1601,"student").then( res => console.log(res)).catch(e => console.log(e));
// database_query.getUserByID(1).then(r => console.log(r));
// database_query.getListJobs(1).then(r=> console.log(r)).catch(e => console.log(e));
// var a= 145234;
// console.log(typeof a);
// database_query.getMessages(1032,1,5).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getMessagesByGroup(20001, 3).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getConversation(3).then(r => console.log(r)).catch(e => console.log(e))

// database_query.getUserByType('admin').then( r => console.log(r)).catch(e => console.log(e));
// database_query.getMessagesByID(1).then(r => console.log(r)).catch(e => log(e));
// database_query.getTerms().then(r => console.log(r)).catch( e => console.log(e));
// database_query.getStudentFollowLecturer(20004).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getJobByID(3).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListJobStudentFollow(2,"all").then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListJobsByKeySearch("%The%requirements%","content",1,10).then(r => console.log(r)).catch( e => console.log(e))
// database_query.getListUsers(1,10,"partner").then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListUserStudentFollow(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListPartnersStudentFollow(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getLecturerStudentFollow(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getPlanReport(3,2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListComment(2).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getPlanReportByID(4).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListStudentFollowJobOfPartner(20014).then(r => console.log(r)).catch(e => console.log(e));
// database_query.getListStudentWorkingForPartner(20014).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getStudentAssession(2).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getAssessionByID(20004,2).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getListStudentFollowPartner(20014).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getPartnerInfo().then(r => console.log(r)).catch(e => console.log(e))
// database_query.getStudentWithLecturer(1,20).then(r => console.log(r)).catch(e => console.log(e))
// database_query.getListJobByTerm(1).then(r => console.log(r)).catch(e => console.log(e))
