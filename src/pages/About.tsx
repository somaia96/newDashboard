
import Members from "../components/AboutUs/Members";
import FormAddMember from "../components/Form/FormsAdd/FormAddMember";

function AboutUs() {

  return (
    <div className="my-5">
      <div className="container">
        <FormAddMember />
      </div>
      <Members />
    </div>
  );
}
export default AboutUs;
