import { Option } from '@/types/vendortype';

const Optioncard = ({ menudata }: any) => {
  const optionlist = menudata.options;
  //   console.log(optionlist);
  return (
    <div>
      {optionlist &&
        optionlist.map((option: Option) => (
          <div key={option.id}>
            <div>
              <div> checkbox</div>
              <div> {option.name}</div>
            </div>
            <div> {option.price}</div>
          </div>
        ))}
    </div>
  );
};

export default Optioncard;
