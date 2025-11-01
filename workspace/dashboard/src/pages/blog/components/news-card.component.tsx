import { Button, Card } from "react-bootstrap";

import { useBlog } from "@/core/client/providers/blog/blog.provider";
import { Buffer } from 'buffer';
import parse from 'html-react-parser';
import { MdDeleteOutline } from "react-icons/md";
import styled from "styled-components";
import { BlogModalUpdateHandler } from "../actions/post-update.actions";
import { ModalUpdatePost } from "./modal-update-post.component";

const ProductCardContainer = styled(Card)`
  background-color: white;
  border: 0px;
  border-radius:10px;
`;


const ProductImage = styled.img`
  width: 100%;
`;


const EditButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
  margin-right: 10px;
  font-size:13px;
`;

const EmptyButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
  width: 20%;
`;

const Description = styled.p`
  max-width: 200ch;
  overflow: hidden; // Removendo barra de rolagem
text-overflow: ellipsis; // Adicionando "..." ao final
display: -webkit-box;
-webkit-line-clamp: 2; // Quantidade de linhas
-webkit-box-orient: vertical; 
font-size:13px;
`

export const NewsCardComponent = ({ post}: any) => {
    const {showModalUpdateAction, closeModalUpdateAction, showModalUpdatePosts} = BlogModalUpdateHandler()
    const {ProviderDeletePost} = useBlog()
    
    return (
        <ProductCardContainer>
            <Card.Body style={{ border: "1px solid #ccc", borderRadius: "10px" }}>
                <div className="mt-2">
                    <center>
                        <ProductImage
                            src={'data:image/png;base64,'+Buffer.from(post?.post_image).toString('base64')}
                            alt=""
                            width={1280}
                            height={200}
                            style={{ borderRadius: "5px" }}
                        />
                    </center>
                </div>
                <div className="mt-3">
                    <h5>{post.post_title}</h5>
                    <Description className="p-0 m-0">
                        {parse(post.post_description)}
                    </Description>
                </div>
                <div className="mt-4 d-flex justify-content-center">
                    <EditButton  style={{ backgroundColor: "#438C12", width:'100%', color: "white" }} onClick={showModalUpdateAction}>
                        Editar
                    </EditButton>
                    <EmptyButton style={{ backgroundColor: "red", color: "white" }} onClick={(()=>{ProviderDeletePost(post.post_reference)})}>
                        <MdDeleteOutline />
                    </EmptyButton>
                </div>
            </Card.Body>
            <ModalUpdatePost showModal={showModalUpdatePosts} handleClose={closeModalUpdateAction} post={post}/>
        </ProductCardContainer >
    );
};
