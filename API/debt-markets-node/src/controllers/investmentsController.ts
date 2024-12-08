// import { Request, Response } from "express";

// class InvestmentController {
//   async invest(req: Request, res: Response):Promise<any> {
//     try {
//       const { id } = req.params;
//       const { userId, amount } = req.body;

//       const bundle = await LoanBundle.findByPk(id);
//       if (!bundle) {
//         return res.status(404).json({ error: "Loan bundle not found" });
//       }

//       if (bundle.currentValue < amount) {
//         return res.status(400).json({ error: "Insufficient funds in bundle" });
//       }

//       const investment = await Investment.create({
//         userId,
//         loanBundleId: id,
//         amount,
//       });

//       bundle.currentValue -= amount;
//       await bundle.save();

//       res.json({ message: "Investment successful", investment });
//     } catch (error) {
//       res.status(500).json({ error: error });
//     }
//   }
// }

// export default new InvestmentController();
