import { Badge, Button } from "react-bootstrap";

import { Buffer } from "buffer";
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import ReadingTime from "../utils/reading-time.utils";

const NewsCardContainer = styled.div`
  img {
    border-radius: 10px;
    width: 100%;
  }
`;

const ReadingTimeBadge = styled(Badge)`
  color: #040c56;
  background-color: #ffd987 !important;
  margin-top: 10px;
`;

const NewsTitle = styled.h4`
  color: #040c56;
  color: white;
`;

const NewsContent = styled.p`
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* número de linhas para exibir */
  -webkit-box-orient: vertical;
`;

const ButtonBlack = styled(Button)`
  background-color:#303030;
  color:white;
  border:0px;
`

export const NewsCardComponent = ({ post }: any) => {
  const truncatedDescription = post?.post_description ? post?.post_description.substring(0, 150) + "..." : "";

  return (
    <>
      <NewsCardContainer>
        <img
           src={'data:image/png;base64,'+Buffer.from(post?.post_image).toString('base64')}
          alt=""
          className="responsive w-100"
        />
      </NewsCardContainer>
      <div className="mt-1">
        <ReadingTimeBadge>{ReadingTime(post?.post_description || "")}</ReadingTimeBadge>
      </div>
      <div className="mt-3">
        <NewsTitle>{post?.post_title}</NewsTitle>
        <NewsContent>
          {parse(truncatedDescription)}
        </NewsContent>
        <div className="mt-3">
          <Link to={`/post/${post?.post_reference}`}>
            <ButtonBlack>
              Ler mais
            </ButtonBlack>
          </Link>
        </div>
      </div>
    </>
  );
};
