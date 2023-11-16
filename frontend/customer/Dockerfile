FROM node:18-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install dependencies based on the preferred package manager
COPY ./ ./
RUN npm install

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# ESLint 검사 비활성화
ENV ESLINT_IGNORE=true

# 애플리케이션 빌드
RUN npm run build

# 포트 설정 및 실행 명령
EXPOSE 3000
CMD ["npm", "start"]