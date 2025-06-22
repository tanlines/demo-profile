export const situations = [
  {
    title: "Unblock user in web app",
    principles: ["Customer Obsession", "Dive Deep", "Earn Trust", "Bias for Action", "Deliver Results"],
    situation: "First level support was not available that day and a critical issue had come up in the web app where a hospital administrator was blocked from updating their system during peak hours.",
    task: "Unblock the user with as little downtime as possible while ensuring data integrity.",
    action: "Immediately went on video call with the customer and quickly figured out a workaround within the UI to unblock the user. Documented the process and later designed a better long-term solution that prevented this issue from recurring.",
    result: "User was unblocked within 30 minutes, allowing them to resume normal operations immediately. The long-term solution was implemented within 2 weeks, preventing similar issues for all users."
  },
  {
    title: "Generate report for large government client",
    principles: ["Bias for Action", "Earn Trust", "Dive Deep", "Ownership", "Deliver Results"],
    situation: "Director of DVA (Department of Veterans Affairs) required a critical financial report as part of their annual review process with only a couple weeks notice. This report was essential for maintaining our contract with one of our largest government clients.",
    task: "Modify the logic inside our web application to generate the required financial figures.",
    action: "Worked over the weekend to analyze the requirements, modify the calcuation logic and build the necessary API endpoints. Coordinated with the product manager to validate the generated figures.",
    result: "Report was generated and delivered on time, meeting all DVA requirements and compliance standards. The report aided in maintaining our contract with one of our largest customers."
  },
  {
    title: "Generate report for data team",
    principles: ["Bias for Action", "Earn Trust", "Dive Deep", "Invent and Simplify", "Think Big"],
    situation: "Data team required a recurring report from running a specific SQL query on a webapp database on a yearly basis. The manual process was time-consuming, error-prone, and required database access that not all team members had.",
    task: "Create a sustainable, automated solution that allows the data team to generate the required report efficiently without requiring direct database access or technical expertise.",
    action: "Analyzed the existing manual process and identified the core requirements. Instead of creating a one-time solution, I designed a hidden endpoint with proper authentication that allowed the data team to generate the report through the web application interface.",
    result: "Futureproof solution completed within a similar time as a manual approach. Eliminated the need for direct database access, reducing security risks. The data team could now generate reports independently without technical assistance."
  },
  {
    title: "Redesign homepage for improved customer experience",
    principles: ["Customer Obsession", "Invent and Simplify", "Dive Deep", "Think Big", "Deliver Results"],
    situation: "The homepages for the web applications had not been updated in a while and were not providing a good experience for the customer.",
    task: "Redesign the homepages to simplify the customer journey and improve the overall user experience.",
    action: "Iterated on new design drafted by the product manager and used metrics to find slow loading endpoints to improve.",
    result: "Improved customer experience and reduced the time users spent navigating to their desired features."
  },
  {
    title: "Clean up Datadog monitors",
    principles: ["Invent and Simplify"],
    situation: "There were a lot of Datadog monitors that were not being used and were causing confusion for the team. There were also a lot of alerts that were not being investigated, leading to alert fatigue and missed critical issues.",
    task: "Clean up the Datadog monitoring to remove unused monitors, consolidate redundant alerts, and establish a more effective monitoring strategy.",
    action: "Reviewed existing monitors an identified unused and redundant ones, reformatting to be easier to view. Created new more specific monitors based on past alerts.",
    result: "Reduced alert fatigue and improved the team's ability to respond to genuine issues."
  },
  {
    title: "Setup peering connection",
    principles: ["Customer Obsession", "Deliver Results"],
    situation: "A peering connection between the Australia and US branches of the company was needed to send data as part of a new product.",
    task: "Establish a secure and reliable network connection between the two regional offices to enable data transmission for the new product.",
    action: "Coordinated with IT team in the US region and configured the necessary routing protocols.",
    result: "Successfully established the peering connection, enabling seamless data flow between Australia and US offices, which supported the launch of the new product and improved cross-regional collaboration."
  }
]; 