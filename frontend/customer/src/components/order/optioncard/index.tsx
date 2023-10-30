import { Option } from '@/types/vendortype';
import { OptionBox, Content, RowBox, OptionList, CountBox, Airfont } from './Optioncard.styled';
import Checkbox from '@/components/common/checkbox';

const Optioncard = ({ menudata }: any) => {
  const optionlist = menudata.options;
  //   console.log(optionlist);
  return (
    <OptionList>
      <OptionBox>
        <div> 옵션선택</div>
        {optionlist &&
          optionlist.map((option: Option) => (
            <div key={option.id}>
              <div>
                <Content>
                  <RowBox>
                    <Checkbox text={option.name}></Checkbox>
                    {/* <Airfont> {option.name}</Airfont> */}
                  </RowBox>
                  <Airfont> {option.price} 원</Airfont>
                </Content>
              </div>
            </div>
          ))}
      </OptionBox>
      <CountBox>
        <div> 수량</div>
        <RowBox>
          <img src="/images/orderfunding/minus.png" style={{ width: '26px' }} />
          <div> 숫자</div>
          <img src="/images/orderfunding/plus.png" style={{ width: '26px' }} />
        </RowBox>
      </CountBox>
    </OptionList>
  );
};

export default Optioncard;
