/*global chrome*/
import { useEffect, useState } from "react";
import { Button, Input,message } from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "./index.less";
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {
  const [accounts, setAccounts] = useState({});
  let types = ["name","address", "email", "twitter", "discord", "telegram", "phone"];

  // 获取日志数据
  const getAccounts = () => {
    chrome.storage.sync.get("accounts").then(({accounts}) => {
      window.accounts_form = accounts;
      if (!accounts) {
          accounts = {};
          types.map(item=>{
              accounts[item] = "";
          })
      };
      console.log(accounts,'---accounts');
      setAccounts({...accounts})
    });
  };
  const setChromeStorageSync = (accounts) => {
    chrome.storage.sync.set({accounts})
    window.accounts_form = accounts;
  }
  const onChange = (e) => {
    accounts[e.target.name] = e.target.value;
    setAccounts({
      ...accounts
    });
    setChromeStorageSync(accounts)
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className={"container"}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <ul className={"logList"}>
        {
          types.map(item=><li key={item}><label>{item}:</label>
            <Input onChange={onChange} value={accounts[item]} type="text" name={item}/>
            <CopyToClipboard text={accounts[item]}
              onCopy={() => {
                toast.success('Copy Successfully!')
              }}>
              <Button type="primary"
              
              >复制</Button>
            </CopyToClipboard>
          </li>)
        }
      </ul>
    </div>
  );
};

export default Home;
