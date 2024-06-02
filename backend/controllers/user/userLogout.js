async function userLogout(req, res) {
    try {
        res
            .clearCookie("token")
            .status(200)
            .json({ status: true, message: "Logout successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports = userLogout;