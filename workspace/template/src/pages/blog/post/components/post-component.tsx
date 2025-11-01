import { Badge } from "react-bootstrap";

import ReadingTime from "@/core/client/utils/reading-time.utils";
import { Buffer } from "buffer";
import parse from 'html-react-parser';
import styled from "styled-components";

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

const AuthorBadge = styled(Badge)`
  color: white;
  background-color: #0C0D11 !important;
  margin-top: 10px;
  margin-left: 10px;
`;

const NewsTitle = styled.h4`
  color: #040c56;
  color: white;
`;

const NewsContent = styled.p`
  color: white;
`;

export const PostComponent = ({ post }: any) => {
  return (
    <>
      <NewsCardContainer>
        <img
          src={'data:image/png;base64,'+Buffer.from(post?.post_image ? post?.post_image : '').toString('base64')}
          alt=""
          className="responsive w-100"
        />
      </NewsCardContainer>
      <div className="mt-1">
        <ReadingTimeBadge>{ReadingTime(String(post?.post_description == undefined ? "" : post?.post_description))}</ReadingTimeBadge>
        <AuthorBadge>Publicado por: {post?.author}</AuthorBadge>
      </div>
      <div className="mt-3">
        <NewsTitle>{post?.post_title}</NewsTitle>
        <NewsContent>
          {parse(String(post?.post_description == undefined ? "" : post?.post_description))}
        </NewsContent>
      </div>
    </>
  );
};
