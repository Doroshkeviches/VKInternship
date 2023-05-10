import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";
import { IPost, IUser, TypeSetState } from "../../types/types";
import useAuth from "../../components/auth/userAuth";
import { setPost } from "../../components/api/setPostApi";
interface IAddPost {
    setPosts: TypeSetState<IPost[]>
}
const AddPost:FC<IAddPost> = ({setPosts}) => {
    const user= useAuth()
    const [content, setContent] = useState<string>('')
    const [file, setFile] = useState<string[]>([])
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile([...file,URL.createObjectURL(e.target.files[0])]);
        }
        console.log(file)
      };

      
    
    const addPostHandler:KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.code === "Enter"){
            const date = new Date()
            const time = date.toLocaleTimeString()
            setPosts(prev => [{
               author: {
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuqj4Wm1BlDTS_zP4EvGRCgZd1mqNthtT-Q&usqp=CAU',
                name: user?.name!,
               },
               content,
               createdAt: time,
               images: file,
               likes: 0 ,
    
            },...prev])
            setPost(user?.telNumber!,user?.name!,user?.avatar!,content,time,file,0)
            setContent('')
        }
    }    
    return (
        <div>
            <input type="text"  placeholder="Add new post" value={content} onChange={e => setContent(e.target.value)} onKeyDown={addPostHandler}/>
            <input type="file" onChange={handleFileChange} onKeyDown={addPostHandler}/>
        </div>
    );
};

export default AddPost;