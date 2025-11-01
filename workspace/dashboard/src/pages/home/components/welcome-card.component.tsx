import { Card, Col } from "react-bootstrap"

import useAuth from "@/global/hooks/auth.hook"

export const WelcomeCard = () => {
    const {user} = useAuth()
    return (
        <Col md={12}>
            <Card className="mt-4" style={{border:"0px", borderRadius:"10px", backgroundColor:"#feebc8", color:"white"}}>
                <Card.Body>
                    <h3 className="text-welcome">Olá, {user?.name} 👋<br /> Dê uma olhada no resumo do dia</h3>
                </Card.Body>
            </Card>
        </Col>
    )
}