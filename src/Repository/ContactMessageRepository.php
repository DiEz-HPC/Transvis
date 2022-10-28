<?php

namespace App\Repository;

use App\Entity\ContactMessage;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<ContactMessage>
 *
 * @method ContactMessage|null find($id, $lockMode = null, $lockVersion = null)
 * @method ContactMessage|null findOneBy(array $criteria, array $orderBy = null)
 * @method ContactMessage[]    findAll()
 * @method ContactMessage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContactMessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ContactMessage::class);
    }

    public function save(ContactMessage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ContactMessage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    //This function send paginate data
    public function paginate(int $page = 1, int $limit = 10): array
    {
        $query = $this->createQueryBuilder('c')
            ->orderBy('c.id', 'DESC')
            ->getQuery();

        $paginator = new Paginator($query);

        $paginator
            ->getQuery()
            ->setFirstResult($limit * ($page - 1)) // Offset
            ->setMaxResults($limit); // Limit

        return $paginator->getIterator()->getArrayCopy();
    }

    //this function send number of pages
    public function getNbPages(int $limit = 10): int
    {
        $query = $this->createQueryBuilder('c')
            ->select('count(c.id)')
            ->getQuery();

        $nbResults = $query->getSingleScalarResult();

        return ceil($nbResults / $limit);
    }

//    /**
//     * @return ContactMessage[] Returns an array of ContactMessage objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ContactMessage
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
