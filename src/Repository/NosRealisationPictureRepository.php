<?php

namespace App\Repository;

use App\Entity\NosRealisationPicture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<NosRealisationPicture>
 *
 * @method NosRealisationPicture|null find($id, $lockMode = null, $lockVersion = null)
 * @method NosRealisationPicture|null findOneBy(array $criteria, array $orderBy = null)
 * @method NosRealisationPicture[]    findAll()
 * @method NosRealisationPicture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NosRealisationPictureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NosRealisationPicture::class);
    }

    public function save(NosRealisationPicture $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(NosRealisationPicture $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return NosRealisationPicture[] Returns an array of NosRealisationPicture objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('n.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?NosRealisationPicture
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
