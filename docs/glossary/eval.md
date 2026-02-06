---
title: 평가(Eval)
---

[← 용어 사전](../glossary)

## 한 줄 정의
평가(Eval)는 모델/프롬프트/RAG/툴 호출 시스템의 품질을 **반복 측정 가능**하게 만드는 절차다.

## 왜 중요한가(실무)
LLM 시스템은 시간이 지나면서 변한다.
- 모델 버전이 바뀐다
- 프롬프트/템플릿이 바뀐다
- 문서(RAG)가 업데이트된다

평가가 없으면 “좋아졌는지/나빠졌는지”를 감(느낌)으로 판단하게 되고, 그 순간부터 운영이 무너진다.

## 핵심 개념(실무형)
### 1) 골든 세트(Golden set)
대표 질문/문서/상황을 모아둔 테스트 세트다.  
최소 20~50개만 있어도 효과가 크다.

### 2) 품질 지표는 정확도만이 아니다
업무에 따라 다음 지표가 중요해진다.
- 근거 적합성(올바른 문서/버전 참조)
- 숫자 오류/정책 위반/금지 항목 노출
- 대외 문서 톤(과장, 단정)
- 비용/지연(토큰, 응답 시간)

### 3) 회귀 테스트(Regression)
변경(모델/프롬프트/RAG/파라미터) 전후를 동일 조건으로 비교하는 것.  
실무에서는 “큰 개선”보다 “나빠지지 않게 유지”가 더 중요할 때가 많다.

## 최소 실행 절차(현장용)
1. 대표 업무 1개를 고른다
2. 질문/입력 20개를 모은다(실데이터는 마스킹)
3. 기준선 결과를 저장한다
4. 변경 후 동일 세트를 다시 실행한다
5. 품질/리스크/비용을 함께 비교한다

## 더 읽기
- NIST AI RMF 1.0: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- NIST AI 600-1(Generative AI Profile, 2024-07-26): https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

