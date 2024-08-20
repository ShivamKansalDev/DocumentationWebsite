import { PageProps, Question, Subheading } from "../../../types/components";

const Page = (props: PageProps | null) =>  {
    let details = null;
    if(props){
        details = props.pageDetails as Subheading; 
    }
    return (
        (details)? (
            <div className="w-full">
            This is {details.topic} page
            {
                details.questions.map((item:Question, index:number) => {
                    return(
                        <div key={`topic/question-${index}`}>
                            <div>{item.question}</div>
                            <div>{item.answer}</div>
                        </div>
                    )
                })
            }
        </div>
        ): (
            <div></div>
        )
    );
}

export default Page;