import {NextResponse} from "next/server";
import {openAi} from "@/app/api/openAI";

export async function POST(request: Request) {
	const {thread_id, run_id} = await request.json();
	let retrieveResult = await openAi.beta.threads.runs.retrieve(
		thread_id,
		run_id
	);

	let status = retrieveResult.status

	console.log('status', status)

	const requireAction = async(retrieveResultIn:any)=>{
		let runs =  retrieveResultIn
		if (
			retrieveResultIn && retrieveResultIn.required_action
			&& retrieveResultIn.required_action.submit_tool_outputs
			&& retrieveResultIn.required_action.submit_tool_outputs.tool_calls
		) {

			const toolOutputs = retrieveResultIn.required_action.submit_tool_outputs.tool_calls.map(
				(tool:any) => {
					console.log('tool',tool)
					if (tool.function.name === "getDistinguish") {
						return {
							tool_call_id: tool.id,
							output: tool.function.arguments.is_hong ? 'true' : 'false',
						};
					}
				},
			);
			// submitToolOutputsAndPoll
			if (toolOutputs.length > 0) {
				runs = await openAi.beta.threads.runs.submitToolOutputsAndPoll(thread_id, run_id, { tool_outputs: toolOutputs},);
				console.log('여기서?',runs)
			}
		}
		return runs.status
	}

	if(status ==='requires_action'){
		status = await requireAction(retrieveResult)
	}




	return NextResponse.json({data: retrieveResult.status}, {status: 200});
}
