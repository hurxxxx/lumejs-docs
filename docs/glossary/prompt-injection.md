---
title: 프롬프트 인젝션(Prompt Injection)
---

[← 용어 사전](../glossary)

## 한 줄 정의
프롬프트 인젝션(Prompt Injection)은 입력에 악성 지시를 섞어 모델의 규칙을 우회하거나, 민감정보를 빼내거나, 의도치 않은 행동(툴 호출)을 유도하는 공격이다.

## 왜 중요한가(실무)
프롬프트 인젝션은 “보안팀만의 문제”가 아니라, 실무자의 일상 업무에서 터질 수 있다.
- 고객 문의/메일/문서에 악성 문구가 섞임
- RAG가 문서를 검색해 올 때 악성 지시가 포함됨(간접 인젝션)
- 에이전트형이 툴 호출로 행동을 수행함

OWASP는 Prompt Injection을 최상위 위험군으로 분류한다.

## 공격 패턴(대표)
### 1) 직접 인젝션
사용자가 “이전 규칙을 무시하고 …” 같은 지시를 넣는다.

### 2) 간접 인젝션(문서 기반)
문서/웹페이지/티켓에 숨겨진 지시를 RAG가 가져오고, 모델이 이를 “규칙”처럼 따르도록 유도한다.

### 3) 데이터 유출(Exfiltration) 목적
시스템 프롬프트, 내부 정책 문구, 비공개 정보를 출력하도록 유도한다.

## 방어 원칙(실무형)
### 1) 프롬프트만으로 막으려 하지 말 것
프롬프트는 도움이 되지만 충분조건이 아니다.

### 2) 권한 통제 + 승인 게이트
툴 호출/대외 발송/DB 쓰기는 최소 권한과 승인 게이트가 필요하다.

### 3) 출력 검증과 불안전한 출력 처리 방지
LLM 출력이 코드/SQL/메일/작업 실행으로 이어질 때는 별도 검증이 필요하다.

### 4) 레드팀 테스트
실제 공격 시나리오 질문 목록으로 취약점을 점검하고, 정책/필터/권한을 개선한다.

## 더 읽기
- OWASP Top 10 for LLM Applications: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- NIST AI 600-1(Generative AI Profile): https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

