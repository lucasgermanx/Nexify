import { useEffect, useState } from "react"

import { CardCopyIPComponent } from "@/pages/home/components/card-copy-address-fivem.component"
import { Container } from "react-bootstrap"
import { DiscordWidgetComponent } from "@/pages/home/components/discord-widget.component"
import Footer from "@/global/components/footer"
import { HeaderComponent } from "@/core/client/components/header.component"
import { IPosts } from "@/core/server/@types/blog.type"
import { PostComponent } from "./components/post-component"
import ProgressBarComponent from "@/core/client/components/progress-bar.component"
import styled from "styled-components"
import useBlog from "@/core/client/hooks/blog.hook"
import { useParams } from "react-router-dom"

const HomePageContainer = styled(Container)`
  margin-top: 5rem;
`;

export const Post = () => {
    const {post_reference} = useParams()
    const {posts} = useBlog()
    const [post, setPost] = useState<IPosts | undefined>()

    useEffect(() => {
        setPost(posts?.filter((item: any) => item.post_reference == post_reference)[0])
    }, [post_reference, posts])
    
    return (
        <>
        <ProgressBarComponent />
        <>
          <HeaderComponent />
          <HomePageContainer>
            <div>
              <section className="d-flex gap-4">
                <div className="col-md-9">      
                    <PostComponent post={post} />           
                </div>
                <div className="col-md-3">
                  <CardCopyIPComponent />
                  <DiscordWidgetComponent />
                </div>
              </section>
            </div>
          </HomePageContainer>
        </>
        <Footer/>
      </>
    )
}