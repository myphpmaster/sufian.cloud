/*  ./components/Overview.js     */
import { CollectionIcon, CurrencyEuroIcon, SparklesIcon, LightningBoltIcon, ChatAlt2Icon, CloudIcon } from '@heroicons/react/outline'

export const Overview = () => {
  return (
    <>

        <div id="overview" className="py-24 bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center px-4">
                <h2 className="text-base text-indigo-600 font-extrabold tracking-wide uppercase">Online Application</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    A better way to perform IEQ POE evaluation
                </p>
                <p className="mt-4 max-w-6xl text-lg text-gray-900 lg:mx-auto">
                Addressing two common challenges for building performance – reducing the carbon footprint attached to the provision of comfortable indoor environments, 
                and improving the health and wellbeing of occupants – requires a more comprehensive understanding of how the indoor environments of buildings are operated.
                </p>
                <p className="mt-4 max-w-6xl text-lg text-gray-900 lg:mx-auto">
                In this new era of Industrial Revolution 4.0, the indoor environmental monitoring online system affords a fundamentally new approach to built environmental field research 
                that holds significant promise to improve building performance and indoor environmental quality and occupant satisfaction, health, wellbeing and performance.
                </p>
                </div>

                <div className="mt-10 px-4">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">

                            <CollectionIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Ease of Data Gathering</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-900">
                    The Internet is a vast virtual world that connects all kinds of people from around the globe. For this reason, a survey that requires a hundred or 
                    more respondents can be conducted faster via the Internet. 
                    The survey questionnaire can be rapidly deployed and completed by the respondents, especially if there’s an incentive that is given after their participation.
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">

                            <CurrencyEuroIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Minimal Costs</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-900">
                    Traditional survey methods often require you to spend thousands of dollars to achieve the optimal results. On the other hand, studies show that conducting 
                    an Internet survey facilitates low-cost and fast data collection from the target population. 
                    Sending email questionnaires and other online questionnaires are more affordable than the face-to-face method.
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">

                            <LightningBoltIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Automation in Data Input and Handling</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-900">
                    With online surveys, the respondents are able to answer the questionnaire by means of inputting their answers while connected to the Internet. 
                    Then, the responses are automatically stored in a survey database, providing hassle-free handling of data and a smaller possibility of data errors.
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">

                            <ChatAlt2Icon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Increase in Response Rates</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-900">
                    Online survey provides the highest level of convenience for the respondents because they can answer the questionnaire according to their own pace, chosen time, and preferences.
                    </dd>
                    </div>
                    
                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">

                            <SparklesIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Flexibility of Design</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-900">
                    Complex types of surveys can be easily conducted through the Internet. The questionnaire may include more than one type of response format 
                    in such a way that the respondents would not get discouraged from the changes in the manner they answer the questions.
                    </dd>
                    </div>
                    
                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">

                            <CloudIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Serverless Technology</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-900">
                    A cloud computing execution model in which the cloud provider allocates machine resources on demand, taking care of the servers on behalf of their customers. 
                    Serverless computing does not hold resources in volatile memory; computing is rather done in short bursts with the results persisted to storage. 
                    When an app is not in use, there are no computing resources allocated to the app.
                    </dd>
                    </div>
                    
                </dl>
                </div>
            </div>
        </div>

    </>
  );
};
