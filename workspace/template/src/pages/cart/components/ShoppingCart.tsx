import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';

function ShoppingCart() {
  return (
    <section className="h-100 h-custom">
      <Container className="h-100 py-5">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col>

            <div className="table-responsive">
              <Table>
                <thead>
                  <tr>
                    <th scope="col" className="h5">Item</th>
                    <th scope="col">Format</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace with your table rows */}
                </tbody>
              </Table>
            </div>

            <Card className="shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px' }}>
              <Card.Body className="p-4">

                <Row>
                  <Col md={6} lg={4} xl={3} className="mb-4 mb-md-0">
                    <Form>
                      {/* Replace with your payment options */}
                    </Form>
                  </Col>
                  <Col md={6} lg={4} xl={6}>
                    <Row>
                      <Col xs={12} xl={6}>
                        <Form.Group className="mb-4 mb-xl-5">
                          {/* Replace with your input fields */}
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={6}>
                        <Form.Group className="mb-4 mb-xl-5">
                          {/* Replace with your input fields */}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} xl={3}>
                    <div style={{ fontWeight: '500' }}>
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">$23.49</p>
                    </div>

                    <div style={{ fontWeight: '500' }}>
                      <p className="mb-0">Shipping</p>
                      <p className="mb-0">$2.99</p>
                    </div>

                    <hr className="my-4" />

                    <div style={{ fontWeight: '500' }}>
                      <p className="mb-2">Total (tax included)</p>
                      <p className="mb-2">$26.48</p>
                    </div>

                    <Button variant="primary" className="btn-block btn-lg">
                      <div className="d-flex justify-content-between">
                        <span>Checkout</span>
                        <span>$26.48</span>
                      </div>
                    </Button>

                  </Col>
                </Row>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ShoppingCart;
