'use strict';
module.exports = function () {

    var services = {
        
        enc01: { //encryptCliendId
            getPath: "/SecurityManagerRest/enc01"
        },
        feed: {
            getPath: "/FeedRest/fed01"
        },
        issuerByStockExchange: {
            getPath: "/CapitalMarketRest/cmc01"
        },
        issuerOperationByPeriodQuery:{
            getPath: "/CapitalMarketRest/cmc02"
        },
        factsbyIssuerQuery:{
            getPath: "/CapitalMarketRest/cmc03"
        },
        issuerGeneralInfoQuery:{
            getPath: "/CapitalMarketRest/cmc04"
        },
        issuerHystoricalInfoQuery:{
            getPath: "/FtpConnectionRest/ftp01"
        },
        marketInfo:{
            getPath: "/MarketInfoRest/mki01"
        },
        usm01: {
            getPath: "/SecurityManagerRest/usm01"
        },
        usm03: {
            getPath: "/SecurityManagerRest/usm03"
        }, 
        usm06: {
            getPath: "/SecurityManagerRest/usm06"
        },
        usm12: {
            getPath: "/SecurityManagerRest/usm12"
        },
        usm04: {
            getPath: "/BalanceRest/usm04"
        },
        usm13: {
            getPath: "/BalanceRest/usm13"
        },
        prc05:{
            getPath: "/BalanceRest/prc05"
        },
        bmv01:{
            getPath: "/ContractRest/bmv01"
        },
        prc12:{
            getPath: "/ContractRest/prc12"
        },
        bpc01:{
            getPath: "/MarketInfoRest/bpc01"
        },
        bpc07:{
            getPath: "/CatalogsRest/bpc07"
        },
        bpc14:{
            getPath: "/CapitalMarketRest/bpc14"
        },
        bpc13:{
            getPath: "/CapitalMarketRest/bpc13"
        },
        bpc12:{
            getPath: "/OrdersRest/bpc12"
        },
        bpc11:{
            getPath: "/PortfolioRest/bpc11"
        },
        bpc19:{
            getPath: "/ClientConfigurationsRest/bpc19"
        },
        bpc21:{
            getPath: "/CapitalMarketRest/bpc21"
        },
        bpc22: {
            getPath: "/CapitalMarketRest/bpc22"
        },
        bpc26: {
            getPath: "/CapitalMarketRest/bpc26"
        },
        bpc28: {
            getPath: "/CapitalMarketRest/bpc28"
        },
        bps01: {
            getPath: "/InvestmentSocietyRest/bps01"
        },

        bps09: {
            getPath: "/PortfolioRest/bps09"
        },
        bps08: {
            getPath: "/CatalogsRest/bps08"

        },
        bpc35:{
            getPath: "/ClientRest/bpc35"
        },
        bpc34:{
            getPath: "/CatalogsRest/bpc34"
        },
        ord01:{
            getPath: "/OrdersRest/ord01"
        },
        ord03:{
            getPath: "/OrdersRest/ord03"
        },
        prd01:{
            getPath: "/ContractRest/prd01"
        },
        prd08:{
            getPath: "/ContractRest/prd08"
        },
        bur37: {
            getPath: "/InvestmentSocietyRest/bur37"
        },
       
        tsp03:{
            getPath: "/FinancialOpsRest/tsp03"
        },
        sft21: {
            getPath: "/ActiPassManagementRest/sft21"
        },
        sft23: {
            getPath: "/ActiPassManagementRest/sft23"
        },
        sft06: {
            getPath: "/ActiPassManagementRest/sft06"
        },
        prs03: {
            getPath: "/StatementRest/prs03"
        },
        prs01: {
            getPath: "/StatementRest/prs01"
        },
        bur52:{
            getPath: "/CapitalMarketRest/bur52"
        },
        bps03:{
            getPath: "/InvestmentSocietyRest/bps03"
        },
        bpc30: {
            getPath: "/PortfolioRest/bpc30"
        },
        prp00: {
            getPath: "/PortfolioRest/prp00"
        },
        prc18:{
            getPath: "/MovementsRest/prc18"

        },
        bps15:{
            getPath: "/InvestmentSocietyRest/bps15"

        },
        bps14:{
            getPath: "/InvestmentSocietyRest/bps14"
        },
        bps13:{
            getPath: "/InvestmentSocietyRest/bps13"
        },
        bps06:{
            getPath: "/InvestmentSocietyRest/bps06"
        },
        bpd04: {
            getPath: "/BondMarketRest/bpd04"
        },
        bpd09: {
            getPath: "/BondMarketRest/bpd09"
        },
        bpd08: {
            getPath: "/BondMarketRest/bpd08"
        },
        prv01: {
            getPath: "/ContractRest/prv01"
        },
        prv04:{
            getPath:"/PortfolioRest/prv04"
        },
        prv07:{
            getPath:"/PortfolioRest/prv07"
        },
        prn01:{
            getPath:"/ClientConfigurationsRest/prn01"
        },
        pra05: {
            getPath: "/SecurityRest/pra05"
        },
        pra07:{
            getPath:"/ClientConfigurationsRest/pra07"
        },
        pra09: {
            getPath: "/ClientConfigurationsRest/pra09"
        },
        pra10: {
            getPath: "/ClientConfigurationsRest/pra10"
        },
        pra11: {
            getPath: "/ClientConfigurationsRest/pra11"
        },
        pra03: {
            getPath: "/SecurityRest/pra03"
        },
        pra04: {
            getPath: "/SecurityRest/pra04"
        },
        pra27: {
            getPath: "/CatalogsRest/pra27"
        },
        gas01: {
            getPath: "/relatedContractsRest/gas01"
        },
        cfb01: {
            getPath: "/ClientServiceRest/cfb01"
        },
        cir04: {
            getPath: "/ContractInfoRest/cir04"
        },
        cir05: {
            getPath: "/ContractInfoRest/cir05"
        },
        ifs01:{
            getPath: "/ContractRest/ifs01"
        },

        /*SERVICIOS ENROLLMENT*/
        usm06e: {
            getPath: "/eactinver/enrollment/usm06"
        },
        pra05e: {
            getPath: "/eactinver/enrollment/pra05"
        },
        pra27e: {
            getPath: "/eactinver/enrollment/pra27"
        },
        pra07e:{
            getPath: "/eactinver/enrollment/pra07"
        },
        sft06e: {
            getPath: "/eactinver/enrollment/sft06"
        },
        sft19e: {
            getPath: "/eactinver/enrollment/sft19"
        },
        sft22e: {
            getPath: "/eactinver/enrollment/sft22"
        },
        sft21e: {
            getPath: "/eactinver/enrollment/sft21"
        },
        pra30e: {
            getPath: "/eactinver/enrollment/pra30"
        },
        prc011e: {
            getPath: "/eactinver/enrollment/prc011"
        },
        sft20e: {
            getPath: "/eactinver/enrollment/sft20"
        },
        prc01: {
            getPath: "/eactinver/enrollment/prc01"
        },


        /*SERVICIOS CAMBIO PASS*/
        sft21p: {
            getPath: "/eactinver/expired/sft21"
        },
        sft23p: {
            getPath: "/eactinver/expired/sft23"
        },
        pra03p: {
            getPath: "/eactinver/expired/pra03"
        },
        usm06p: {
            getPath: "/eactinver/expired/usm06"
        },
        usm04p: {
            getPath: "/eactinver/expired/usm04"
        },

        ord02: {
            getPath: "/OrdersRest/ord02"
        },
        ord04: {
            getPath: "/OrdersRest/ord04"
        },
        ord05: {
            getPath: "/OrdersRest/ord05"
        }




    };

    var buildParams = function (params) {
        var paramsStr = '';
        params.forEach(function (entry) {
            paramsStr += "/" + entry;
        });
        if (params.length > 0)
            paramsStr += "?language=SPA";
        return paramsStr;
    };

    this.pathPost = function (service) {
        return sessionStorage.getItem('basePathBR') + services[service].getPath;
    };
    this.pathGet = function (service, params) {
        return sessionStorage.getItem('basePathBR') + services[service].getPath + buildParams(params);
    };

};
