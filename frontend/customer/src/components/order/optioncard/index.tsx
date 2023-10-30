import { Option } from '@/types/vendortype';
import { OptionBox, Content, RowBox, OptionList, CountBox, Airfont } from './Optioncard.styled';

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
                    <div> checkbox</div>
                    <Airfont> {option.name}</Airfont>
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
          <img src="/images/orderfunding/minus.png" style={{ width: '22px' }} />
          <div> 숫자</div>
          <img src="/images/orderfunding/plus.png" style={{ width: '22px' }} />
        </RowBox>
      </CountBox>
    </OptionList>
  );
};

export default Optioncard;
