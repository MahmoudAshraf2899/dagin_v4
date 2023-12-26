import './CreditTransactions.scss'
export const CreditTransactions = () => {
    return (
        <div className="CreditTransactions">
            <table
                style={{
                    width: "100%",
                }}
            >
                <thead>
                    <tr>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <th className="bannerText">التاريخ</th>
                            <th className="bannerText">العميل</th>
                            <th className="bannerText">مبلغ دائن</th>
                            <th className="bannerText">مبلغ مدين</th>
                            <th className="bannerText">الرصيد</th>
                            <th className="bannerText">البيان</th>

                        </div>
                    </tr>
                </thead>
                <div
                    style={{
                        visibility: "hidden",
                        marginTop: "20px",
                        marginBottom: "80px",
                        paddingRight: "25px",
                    }}
                ></div>
                <tbody>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            height: "70px",
                            alignItems: "center",
                            marginBottom: "10px",
                            marginRight: "25px",
                            marginLeft: "25px"
                        }}
                    >
                        <span className="wallet-date">
                            ١٢\١٠\٢٠٢٣
                        </span>
                        <span className="wallet-client-name"> رحمة محمد</span>
                        <span className="wallet-price">  400 جم</span>
                        <span className="wallet-price">    400 جم</span>
                        <span className="wallet-price">  ١000 جم</span>
                        <span className="wallet-price">

                            <span className="mission-number">
                                قيمة مهمة رقم 123
                            </span>
                        </span>


                    </div>
                </tbody>
            </table>
        </div>
    )
}