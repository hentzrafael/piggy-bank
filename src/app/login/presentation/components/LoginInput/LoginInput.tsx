import { LoginInputProps } from "./LoginInputProps";

export function LoginInput(props:LoginInputProps){
    return (
        <input
          type={props.type}
          placeholder={props.placeholder}
          className="w-full p-4 border-2 border-gray-300 rounded-md mt-2 mb-2"
          value={props.value}
          onChange={props.onChange}
          style={{ color: 'black' }}
        />
    );
}