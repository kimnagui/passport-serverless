import * as jwt from "jsonwebtoken";

interface IProps {
  expiresIn: string | number | undefined;
  payload: {
    [key: string]: any;
  };
}

const { TOKEN_SECRET_KEY = "YourSecretKey" } = process.env;

export default ({ expiresIn, payload }: IProps) => {
  const token = jwt.sign(payload, TOKEN_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};
